import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        `flex h-10 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-white transition-colors hover:bg-secondary focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-primary active:bg-secondary aria-disabled:cursor-not-allowed aria-disabled:opacity-50 cursor-pointer`,
        className
      )}
    >
      {children}
    </button>
  );
}
