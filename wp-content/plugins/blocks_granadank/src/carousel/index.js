import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InnerBlocks, MediaUpload, MediaUploadCheck, RichText } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import './item'; // bloco filho

import metadata from './block.json';

registerBlockType(metadata.name, {
    ...metadata,

    edit({ attributes, setAttributes }) {
        const blockProps = useBlockProps({ className: 'carrossel' });

        return (
            <div {...blockProps} style={{ position: 'relative' }}>
                {/* Upload da imagem de fundo */}
                <RichText
                    tagName="h3"
                    placeholder="Título do item"
                    value={attributes.titulo}
                    onChange={(val) => setAttributes({ titulo: val })}
                />
                <MediaUploadCheck>
                    <MediaUpload
                        onSelect={(media) => setAttributes({ bgImageURL: media.url })}
                        allowedTypes={['image']}
                        value={attributes.bgImageURL}
                        render={({ open }) => (
                            <Button onClick={open}>
                                {attributes.bgImageURL ? 'Alterar imagem' : 'Escolher imagem'}
                            </Button>
                        )}
                    />
                </MediaUploadCheck>

                <div style={{ marginTop: '20px', position: 'relative', zIndex: 1 }}>
                    <h3>Lista de Itens</h3>
                    <InnerBlocks
                        allowedBlocks={['blocks/item']}
                        template={[['blocks/item']]}
                        renderAppender="ButtonBlockAppender"
                    />
                </div>
            </div>
        );
    },

    save({ attributes }) {
        const blockProps = useBlockProps.save({ className: 'carrossel structure-container--left-only'});

        return (
            <div  {...blockProps} style={{ position: 'relative', overflow: 'hidden' }}>
                <div className='content-inside-img'>
                    <RichText.Content
                        tagName="h3"
                        value={attributes.titulo}
                        className="base-allcaps"
                    />
                    <div className="">
                        <InnerBlocks.Content/>
                    </div>
                </div>
            </div>
        );
    },
});
