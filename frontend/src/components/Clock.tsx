import { useEffect, useState } from "react";

export default function Clock({
	className = "",
	...props
}: React.HTMLAttributes<HTMLSpanElement>) {
	const [time, setTime] = useState(new Date().toLocaleTimeString());

	useEffect(() => {
		const interval = setInterval(() => {
			setTime(new Date().toLocaleTimeString());
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	return (
		<span className={`font-mono ` + className} {...props} title="clock">
			{time}
		</span>
	);
}
