export default function DashboardButton({
	children,
	className = "",
	...props
}: React.PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>>) {
	return (
		<button
			className={
				"flex flex-col p-10 gap-4 w-48 h-48 justify-center items-center " +
				className
			}
			{...props}
		>
			{children}
		</button>
	);
}
