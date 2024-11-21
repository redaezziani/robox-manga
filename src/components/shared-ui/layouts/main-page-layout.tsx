import React from 'react';

/**
 * MainPageLayout Component
 * 
 * A reusable layout component that serves as a container for the main content of a page.
 * It is designed to be flexible and accepts any children elements to be displayed within.
 * 
 * Props:
 * - `children`: ReactNode - The content to be rendered inside the layout.
 * 
 * Styling:
 * - `px-3`: Adds padding on the left and right.
 * - `mt-20`: Adds a top margin to create space between the layout and other elements above it.
 * - `overflow-y-auto`: Enables vertical scrolling if the content exceeds the height of the container.
 * - `flex flex-col`: Displays the content in a column layout with flexbox.
 * - `gap-3`: Adds spacing between the children elements.
 * - `justify-start`: Aligns items at the start of the main axis (top-to-bottom in a column layout).
 * - `items-start`: Aligns items at the start of the cross-axis (left-to-right in a column layout).
 * - `relative`: Sets the positioning context to `relative` for potential child positioning.
 * - `w-full`: Ensures the layout takes the full width of its container.
 * 
 * Usage:
 * This component is intended to wrap the main content of a page. Simply pass the desired content
 * as children to the `MainPageLayout` component.
 * 
 * Example:
 * ```tsx
 * import MainPageLayout from './MainPageLayout';
 * 
 * const HomePage = () => {
 *   return (
 *     <MainPageLayout>
 *       <h1 className="text-2xl font-bold">Welcome</h1>
 *       <p>This is the main content area of the home page.</p>
 *     </MainPageLayout>
 *   );
 * };
 * 
 * export default HomePage;
 * ```
 */
const MainPageLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <main
      className="px-3 mt-20 overflow-y-auto flex flex-col gap-3 justify-start items-start relative w-full"
    >
      {children}
    </main>
  );
};

export default MainPageLayout;

