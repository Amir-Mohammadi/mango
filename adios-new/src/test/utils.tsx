import { Providers } from '@/Providers';
import { render } from '@testing-library/react';


const CustomWrapper = ({ children }) => {
  return <Providers>{children}</Providers>;
};

const customRender = (ui, options?: any) =>
  render(ui, {
    wrapper: CustomWrapper,
    ...options,
  });

// re-export everything
export * from '@testing-library/react';
// override render method
export { customRender as render };

