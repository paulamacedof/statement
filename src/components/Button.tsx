import classNames from "classnames";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "tertiary";
  disabled?: boolean;
}

export const Button = ({
  children,
  onClick,
  variant = "primary",
  disabled = false,
}: ButtonProps) => {
  const buttonClass = classNames(
    "rounded font-semibold px-5 py-3 transition md:px-10 md:py-4 ",
    {
      "text-white bg-orange-500 hover:bg-orange-400": variant === "primary",
      "text-white bg-[#004D61] hover:bg-cyan-800": variant === "secondary",
      "text-[#004D61] border border-[#004D61] bg-white hover:bg-[#DEE9EA]":
        variant === "tertiary",
      "opacity-25 pointer-events-none": disabled,
    }
  );

  return (
    <button onClick={onClick} className={buttonClass} disabled={disabled}>
      {children}
    </button>
  );
};
