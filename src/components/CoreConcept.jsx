export function CoreConcept({ description, title, img }) {
	return (
		<li>
			<img src={img} alt={title} />
			<h3>{title}</h3>
			<p>{description}</p>
		</li>
	);
}
