import coopIcon from "../../assets/sappper-logo.png";

interface LogoProps {
    className?: string;
    showText?: boolean;
    textClassName?: string;
}

export const Logo = ({
    className,
    showText = true,
    textClassName = "font-bold text-black"
}: LogoProps) => (
    <div className="flex items-center gap-4">
        <img className={className} src={coopIcon} alt="logo" />
        {showText && (
            <p className={textClassName}>Sappers</p>
        )}
    </div>
);