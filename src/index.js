import './style.css'


import { BlockManager } from '@block-builder/core';
import { OptBlockRenderer } from '@block-builder/ui';
import '@block-builder/ui/dist/index.css'

const manager = new BlockManager([], { useDefaultTypesBlocks: true, saveEndpoint: '/api/save' });
manager.registerBlock({ 
    type: 'text', 
    name: 'Кастомный текстовый блок',
    props: {
        title: '',
        text: '',
        img: '',
        tags: [],
        items: [],
    },
    form: {
        title: {
            typeField: 'text',
            validation: null,
            placeholder: 'placeholder title',
            label: 'Заголовок'
        },
        text: {
            typeField: 'textarea',
            validation: null,
            placeholder: 'placeholder textarea',
            label: 'Описание'
        },
        img: {
            typeField: 'image',
            validation: null,
            placeholder: '',
            label: 'Изображение'
        },
        tags: {
            typeField: 'each-array',
            validation: null,
            placeholder: [],
            label: 'Теги',
            each: {
                typeField: 'text',
                validation: null,
                placeholder: 'tag',
                label: 'Тег'
            }
        },
        items: {
            typeField: 'each-array',
            validation: null,
            placeholder: [],
            each: {
                typeField: 'each-object',
                validation: null,
                placeholder: { name: '', age: '' },
                label: 'Айтемсы для примера',
                each: {
                    name: {
                        typeField: 'text',
                        validation: null,
                        placeholder: 'placeholder name',
                        label: 'Имя'
                    },
                    age: {
                        typeField: 'text',
                        validation: null,
                        placeholder: 'placeholder age',
                        label: 'Возраст'
                    },
                }
                
            }
        }
    }
});
manager.addBlock(
    'text',
    { 
        title: 'Hello from Webpack!',
        text: 'Текстовый узел',
        items: [ { name: 'JOJO', age: 21 }, { name: 'DIO', age: 120 } ],
        tags: [ 'мощный', 'лютый', 'неповторимый' ],
        img: 'https://api.deep-cosmo.ru/media/images/YHGgTUTrbmg9RCvVJC6X8A2PcAaTeY2E.jpg'
    }
)
manager.addBlock(
    'text',
    { 
        title: 'Лалалейлатрубода',
        text: 'Второй текстовый блок для теста',
        items: [ { name: 'Арам', age: 1 }, { name: 'Барум', age: 2 } ],
        img: 'https://api.deep-cosmo.ru/media/images/3407-full.jpg'
    }
)

const blockRenderer = new OptBlockRenderer(
    manager.getBlocks(),
    {
        'text':
        `
            <div class="c-text">
                <div class="c-text__inner">
                    <div class="c-text__preview">
                        <img class="c-text__img" width="200" src="[[img]]" />
                    </div>
                    <div class="c-text__content">
                        <h2 class="c-text__title">
                            [[title]]
                        </h2>
                        <div class="c-text__text">
                            [[text]]
                        </div>
                        <div render-if="text1">
                            [[text1]]
                        </div>

                        <div render-if="tags" class="c-text__tags">
                            <div class="c-text__tag" render-for="item in tags">
                                #[[item]]
                            </div>
                        </div>

                        <div class="c-text__list">
                            <div render-for="(item, i) in items" class="c-text__list-item">
                                [[i + 1]]. [[item.name]] ([[item.age]])
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    },
    manager,
    document.getElementById('c-template')
)
