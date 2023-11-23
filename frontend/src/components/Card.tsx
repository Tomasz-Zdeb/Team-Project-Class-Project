export default function Card({
	children,
	className = "",
	...props
}: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) {
	return (
		<div
			className={
				`
			flex flex-col items-center 
			border-2 border-border 
			rounded-lg gap-8 p-4 
			text-2xl shadow-main ` + className
			}
			{...props}
		>
			{children}
		</div>
	);
}
