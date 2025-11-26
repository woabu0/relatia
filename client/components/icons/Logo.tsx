import Link from "next/link";

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ className = "", showText = true, size = 'md' }: LogoProps) {
  const sizeClasses = {
    sm: { text: 'text-lg' },
    md: { text: 'text-xl md:text-2xl' },
    lg: { text: 'text-2xl md:text-3xl' },
  };

  const currentSize = sizeClasses[size];

  return (
    <Link href="/" className={`flex items-center gap-2 group ${className}`}>
      {/* Text-only Logo */}
      {showText && (
        <span className={`${currentSize.text} font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent group-hover:from-blue-300 group-hover:via-blue-400 group-hover:to-purple-400 transition-all duration-300 tracking-tight`}>
          Relatia
        </span>
      )}
    </Link>
  );
}
