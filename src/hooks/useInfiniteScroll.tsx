import { useState, useEffect, useCallback, useRef } from 'react';
import { useToastController } from '@tamagui/toast';
import { XCircle } from '@tamagui/lucide-icons';
import { iCard, PaginatedResponse } from '../interfaces';
import { getCardsPaginated } from '../services/CardService';

interface UseInfiniteScrollProps {
  userId: string;
  searchTerm?: string;
  pageSize?: number;
}

interface UseInfiniteScrollReturn {
  data: iCard[];
  loading: boolean;
  hasMore: boolean;
  error: boolean;
  isInitialized: boolean;
  loadMore: () => void;
  refresh: () => void;
  search: (term: string) => void;
}

export const useInfiniteScroll = ({
  userId,
  searchTerm = '',
  pageSize = 15,
}: UseInfiniteScrollProps): UseInfiniteScrollReturn => {
  const [data, setData] = useState<iCard[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSearch, setCurrentSearch] = useState(searchTerm);
  const [error, setError] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const isInitializedRef = useRef(false);
  const toast = useToastController();

  const fetchData = useCallback(async (page: number, search: string, append: boolean = false) => {
    if (!userId) return;
    
    setLoading(true);
    setError(false);
    
    try {
      const response: PaginatedResponse<iCard> = await getCardsPaginated(userId, page, pageSize, search);
      
      if (append) {
        setData(prev => [...prev, ...response.data]);
      } else {
        setData(response.data);
      }
      
      setHasMore(page < response.totalPages);
      setCurrentPage(page);
      setIsInitialized(true);
    } catch (err) {
      console.error('Erro ao buscar cards:', err);
      setError(true);
      
      // Se for o carregamento inicial (página 1 e não append), mostra erro mais específico
      if (page === 1 && !append) {
        toast.show('Ocorreu um erro!', {
          message: 'Tente novamente.',
          viewportName: 'main',
          customData: { icon: <XCircle size={25} /> },
        });
      } else {
        // Se for carregamento de mais dados, mostra erro mais sutil
        toast.show('Ocorreu um erro ao carregar mais dados!', {
          message: 'Tente novamente.',
          viewportName: 'main',
          customData: { icon: <XCircle size={25} /> },
        });
      }
      
      // Não limpa os dados em caso de erro, mantém o que já foi carregado
      // Apenas reseta o estado de loading para permitir nova tentativa
    } finally {
      setLoading(false);
    }
  }, [userId, pageSize, toast]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      fetchData(currentPage + 1, currentSearch, true);
    }
  }, [loading, hasMore, currentPage, currentSearch, fetchData]);

  const refresh = useCallback(() => {
    setData([]);
    setCurrentPage(1);
    setHasMore(true);
    setError(false);
    fetchData(1, currentSearch, false);
  }, [currentSearch, fetchData]);

  const search = useCallback((term: string) => {
    setCurrentSearch(term);
    setData([]);
    setCurrentPage(1);
    setHasMore(true);
    setError(false);
    fetchData(1, term, false);
  }, [fetchData]);

  // Carregar dados iniciais
  useEffect(() => {
    if (userId && !isInitializedRef.current) {
      isInitializedRef.current = true;
      refresh();
    }
  }, [userId, refresh]);

  // Atualizar quando o termo de busca mudar
  useEffect(() => {
    if (isInitializedRef.current && currentSearch !== searchTerm) {
      setCurrentSearch(searchTerm);
      setData([]);
      setCurrentPage(1);
      setHasMore(true);
      setError(false);
      fetchData(1, searchTerm, false);
    }
  }, [searchTerm, fetchData]);

  return {
    data,
    loading,
    hasMore,
    error,
    isInitialized,
    loadMore,
    refresh,
    search,
  };
}; 