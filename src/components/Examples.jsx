import { Children, useState } from 'react';
import { EXAMPLES } from '../data';
import { TabButton } from './TabButton';
import { Section } from './Section';
import { Tabs } from './Tabs';
import { ToDoList } from './ToDoList';

export function Examples() {
  const [selectedTopic, setSelectedTopic] = useState('components');
  // const selectedTopic = 'jsx';

  function handleSelect(selectedButton) {
    setSelectedTopic(selectedButton);
  }

  return (
    <Section title="Examples" id="examples">
      <Tabs
        ButtonContainer="menu"
        buttons={
          <>
            <TabButton isSelected={selectedTopic === 'components'} onClick={() => handleSelect('components')}>
              Components
            </TabButton>
            <TabButton isSelected={selectedTopic === 'jsx'} onClick={() => handleSelect('jsx')}>
              JSX
            </TabButton>
            <TabButton isSelected={selectedTopic === 'props'} onClick={() => handleSelect('props')}>
              Props
            </TabButton>
            <TabButton isSelected={selectedTopic === 'state'} onClick={() => handleSelect('state')}>
              State
            </TabButton>
            <TabButton isSelected={selectedTopic === 'todolist'} onClick={() => handleSelect('todolist')}>
              To Do List
            </TabButton>
          </>
        }
      >
        <div id="tab-content">
          <h3>{EXAMPLES[selectedTopic].title}</h3>
          <p>{EXAMPLES[selectedTopic].description}</p>
          <pre>
            <code>{EXAMPLES[selectedTopic].code}</code>
          </pre>
          {selectedTopic === 'todolist' ? <ToDoList /> : ''}
        </div>
      </Tabs>
    </Section>
  );
}
