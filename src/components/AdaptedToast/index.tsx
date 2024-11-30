import { Toast, useToastState } from '@tamagui/toast';
import React from 'react';
import { XStack, YStack } from 'tamagui';

export default function AdaptedToast() {
  const currentToast = useToastState();

  if (!currentToast || currentToast.isHandledNatively) return null;

  return (
    <Toast
      key={currentToast.id}
      duration={3500}
      enterStyle={{ opacity: 0, scale: 0.5, y: -25 }}
      exitStyle={{ opacity: 0, scale: 1, y: -20 }}
      y={0}
      opacity={1}
      scale={1}
      animation='100ms'
      viewportName={currentToast.viewportName}
    >
      <XStack alignItems='center' justifyContent='center' gap={10}>
        {currentToast.customData?.icon}
        <YStack>
          <Toast.Title>{currentToast.title}</Toast.Title>
          {!!currentToast.message && <Toast.Description>{currentToast.message}</Toast.Description>}
        </YStack>
      </XStack>
    </Toast>
  );
}
