import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { KeyboardOffsets, ScreenVariants } from './screen.variants';

export interface ScreenProps {
  /**
   * Children components.
   */
  children?: React.ReactNode;

  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>;

  /**
   * One of the different types of variants.
   */
  variant?: ScreenVariants;

  /**
   * An optional background color
   */
  backgroundColor?: string;

  /**
   * An optional status bar setting. Defaults to light-content.
   */
  statusBar?: 'light-content' | 'dark-content';

  /**
   * By how much should we offset the keyboard? Defaults to none.
   */
  keyboardOffset?: KeyboardOffsets;

  /**
   * Should keyboard persist on screen tap. Defaults to handled.
   * Only applies to scroll variants.
   */
  keyboardShouldPersistTaps?: 'handled' | 'always' | 'never';
}
