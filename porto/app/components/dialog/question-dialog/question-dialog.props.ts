export interface QuestionDialogProps {
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

  /**
   * onCancel Function
   */
  onCancel?: () => void;
}
