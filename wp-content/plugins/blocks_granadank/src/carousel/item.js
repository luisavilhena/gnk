import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, RichText } from '@wordpress/block-editor';

registerBlockType('blocks/item', {
    title: 'Item',
    icon: 'admin-post',
    category: 'widgets',
    parent: ['blocks/meu-bloco'],
    attributes: {
        titulo: { type: 'string', source: 'html', selector: 'h4' },
        descricao: { type: 'string', source: 'html', selector: 'p' },
        tituloClass: { type: 'string', default: 'titulo-main' },
        descricaoClass: { type: 'string', default: 'base-main' },
    },
    

    edit({ attributes, setAttributes }) {
        const blockProps = useBlockProps({ className: 'meu-bloco-item' });

        return (
            <div {...blockProps}>
                <RichText
                    tagName="h4"
                    placeholder="Título do item"
                    value={attributes.titulo}
                    onChange={(val) => setAttributes({ titulo: val })}
                />
                <RichText
                    tagName="p"
                    placeholder="Descrição do item"
                    value={attributes.descricao}
                    onChange={(val) => setAttributes({ descricao: val })}
                />

            </div>
        );
    },

    save({ attributes }) {
        const blockProps = useBlockProps.save({ className: 'meu-bloco-item' });

        return (
            <div {...blockProps}>
                <div className='meu-bloco-item--container'>
                    <RichText.Content
                        tagName="h4"
                        value={attributes.titulo}
                        className={attributes.tituloClass}
                    />
                    <RichText.Content
                        tagName="p"
                        value={attributes.descricao}
                        className={attributes.descricaoClass}
                    />
                </div>
            </div>
        );
    },
});
