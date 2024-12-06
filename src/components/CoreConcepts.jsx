import { CORE_CONCEPTS } from '../data';
import { CoreConcept } from './CoreConcept';
import { Section } from './Section';
export function CoreConcepts() {
  return (
    <Section title="Core Concepts" id="core-concepts">
      <ul>
        {CORE_CONCEPTS.map(conceptItem => (
          <CoreConcept key={conceptItem.id} {...conceptItem} />
        ))}
      </ul>
    </Section>
  );
}
