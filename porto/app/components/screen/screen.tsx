import * as React from 'react';
import {
    KeyboardAvoidingView,
    ScrollView,

    View
} from 'react-native';
import { ScreenProps } from './screen.props';
import { innerVariants, offsets, outerVariants } from './screen.variants';

function ScreenWithoutScrolling(props: ScreenProps) {
  const { style, variant = 'fixed' } = props;
  const backgroundStyle = props.backgroundColor
    ? { backgroundColor: props.backgroundColor }
    : {};

  return (
    <KeyboardAvoidingView
      style={[outerVariants[variant], backgroundStyle]}
      keyboardVerticalOffset={offsets[props.keyboardOffset || 'none']}>
      {/* <StatusBar barStyle={props.statusBar || 'light-content'} /> */}
      <View style={[innerVariants[variant], style]}>{props.children}</View>
    </KeyboardAvoidingView>
  );
}

function ScreenWithScrolling(props: ScreenProps) {
  const { style, variant = 'scroll' } = props;
  const backgroundStyle = props.backgroundColor
    ? { backgroundColor: props.backgroundColor }
    : {};

  return (
    <KeyboardAvoidingView
      style={[outerVariants[variant], backgroundStyle]}
      keyboardVerticalOffset={offsets[props.keyboardOffset || 'none']}>
      {/* <StatusBar barStyle={props.statusBar || 'light-content'} /> */}
      <View style={[outerVariants[variant], backgroundStyle]}>
        <ScrollView
          style={[outerVariants[variant], backgroundStyle]}
          contentContainerStyle={[innerVariants[variant], style]}
          keyboardShouldPersistTaps={
            props.keyboardShouldPersistTaps || 'handled'
          }>
          {props.children}
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

function ScreenWithScrollingView(props: ScreenProps) {
  const { style, variant = 'scrollView' } = props;
  const backgroundStyle = props.backgroundColor
    ? { backgroundColor: props.backgroundColor }
    : {};
  return (
    <ScrollView
      style={[outerVariants[variant], backgroundStyle]}
      contentContainerStyle={[innerVariants[variant], style]}>
      {props.children}
    </ScrollView>
  );
}
/**
 * The starting component on every screen in the app.
 *
 * @param props The screen props
 */
export const Screen: React.FC<ScreenProps> = props => {
  const { variant = 'fixed' } = props;

  if (variant === 'fixed') {
    return <ScreenWithoutScrolling {...props} />;
  } else if (variant === 'scroll') {
    return <ScreenWithScrolling {...props} />;
  } else {
    return <ScreenWithScrollingView {...props} />;
  }
};
