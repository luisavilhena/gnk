import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, RichText, URLInput } from '@wordpress/block-editor';
import metadata from './block.json';

registerBlockType(metadata.name, {
    ...metadata,

    edit({ attributes, setAttributes }) {
        const { subtitulo, titulo, descricao, link, linkTexto } = attributes;
        const blockProps = useBlockProps({ className: 'bloco-escritorio' });

        return (
            <div {...blockProps}>
                <RichText
                    tagName="h4"
                    value={subtitulo}
                    onChange={(val) => setAttributes({ subtitulo: val })}
                    placeholder="Digite o subtítulo..."
                />

                <RichText
                    tagName="h2"
                    value={titulo}
                    onChange={(val) => setAttributes({ titulo: val })}
                    placeholder="Digite o título..."
                />

                <RichText
                    tagName="p"
                    value={descricao}
                    onChange={(val) => setAttributes({ descricao: val })}
                    placeholder="Digite a descrição..."
                />

                {/* Campo de URL */}
                <div style={{ marginTop: 12 }}>
                    <label style={{ display: 'block', fontSize: 12, color: '#666', marginBottom: 6 }}>Link (URL)</label>
                    <URLInput
                        value={link}
                        onChange={(val) => setAttributes({ link: val })}
                        placeholder="https://"
                    />
                </div>

                {/* Texto do link */}
                {link && (
                    <div style={{ marginTop: 12 }}>
                        <RichText
                            tagName="span"
                            value={linkTexto}
                            onChange={(val) => setAttributes({ linkTexto: val })}
                            placeholder="Texto do link..."
                            allowedFormats={[]} // evita aplicar bold/italic sem querer
                        />
                    </div>
                )}
            </div>
        );
    },

    save({ attributes }) {
        const { subtitulo, titulo, descricao, link, linkTexto } = attributes;
        const blockProps = useBlockProps.save({ className: 'bloco-escritorio' });

        return (
            <div id="escritorio"  {...blockProps}>
                <div className="escritorio-content structure-container--left-only">
                    <RichText.Content tagName="h4" className="base-allcaps" value={subtitulo} />
                    <RichText.Content tagName="h2" className="titulo-main" value={titulo} />
                    <RichText.Content tagName="p" className="base-main" value={descricao} />

                    {link && (
                            <a href={link} className="escritorio-link base-main">
                                <RichText.Content value={linkTexto} />
                            </a>
                    )}
                </div>
            </div>
        );
    },
});
