export interface AlertDialogProps {
  /**
   * is visible
   */
  isVisible: boolean;

  /**
   * title
   */
  title?: string;

  /**
   * message
   */
  message?: string;

  /**
   * onSubmit Function
   */
  onSubmit?: () => void;

  /**
   * onDismiss Function
   */
  onDismiss?: () => void;
}
