import { BlockManager, BlockRenderer } from '@block-builder/core';

const manager = new BlockManager([], { useDefaultTypesBlocks: true });
manager.registerBlock({ 
    type: 'text', 
    name: 'Кастомный текстовый блок',
    props: {
        text: '',
        items: [],
        img: ''
    } 
});
manager.addBlock(
    'text',
    { 
        text: 'Hello from Webpack!',
        items: [ { name: 'JOJO', age: 21 }, { name: 'DIO', age: 120 } ],
        img: 'https://api.deep-cosmo.ru/media/images/YHGgTUTrbmg9RCvVJC6X8A2PcAaTeY2E.jpg'
    }
)
manager.addBlock(
    'text',
    { 
        text: 'Второй текстовый блок для теста',
        items: [ { name: 'Арам', age: 1 }, { name: 'Барум', age: 2 } ],
        img: 'https://api.deep-cosmo.ru/media/images/YHGgTUTrbmg9RCvVJC6X8A2PcAaTeY2E.jpg'
    }
)
// or
// manager.editBlock(
//     [0],
//     { 
//         text: 'Hello from Webpack!',
//         items: [ { name: 'JOJO', age: 21 } ],
//         img: 'https://api.deep-cosmo.ru/media/images/YHGgTUTrbmg9RCvVJC6X8A2PcAaTeY2E.jpg'
//     }
// )

const blockRenderer = new BlockRenderer(
    manager,
    {
        'text':
        `
            <div class="c-text">
                <div class="c-text__inner">
                    [[text]]
                </div>

                <div render-if="text1">
                    [[text1]]
                </div>

                <img class="c-text__img" width="200" src="[[img]]" />


                <ul>
                    <li render-for="(item, i) in items">
                        [[i + 1]]. [[item.name]] ([[item.age]])

                        <pre>
                            [[item]]
                        </pre>
                    </li>
                </ul>
            </div>
        `
    }
)
blockRenderer.renderTo(document.getElementById('c-template'))


console.log('Current blocks:', manager.getBlocks());

// Для демонстрации в браузере
document.getElementById('log').innerHTML = `
  <h1>Block Builder Core Test</h1>
  <pre>${JSON.stringify(manager.getBlocks(), null, 2)}</pre>
`;