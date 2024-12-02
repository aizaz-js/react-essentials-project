export function TabButton({ children, isSelected, onClick }) {
	return (
		<li>
			<button className={isSelected ? "active" : ""} onClick={onClick}>
				{children}
			</button>
		</li>
	);
}
