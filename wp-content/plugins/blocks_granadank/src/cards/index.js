import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, MediaUpload, MediaUploadCheck, RichText, URLInput } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import metadata from './block.json';

registerBlockType(metadata.name, {
    ...metadata,

    edit({ attributes, setAttributes }) {
        const { blocoTitulo, cards } = attributes;
        const blockProps = useBlockProps();

        // Função para atualizar qualquer campo do card
        const updateCard = (index, field, value) => {
            const newCards = [...cards]; // cria novo array
            newCards[index] = { ...newCards[index], [field]: value }; // cria novo objeto
            setAttributes({ cards: newCards }); // atualiza atributo
        };

        return (
            <div {...blockProps} className="dois-cards">
                {/* Título geral do bloco */}
                <RichText
                    tagName="h2"
                    value={blocoTitulo}
                    onChange={(val) => setAttributes({ blocoTitulo: val })}
                    placeholder="Título do bloco..."
                />

                {/* Loop dos cards */}
                {cards.map((card, index) => (
                    <div key={index} className="card">
                        {/* Upload de imagem */}
                        <MediaUploadCheck>
                            <MediaUpload
                                onSelect={(media) => updateCard(index, 'imageURL', media.url)}
                                allowedTypes={['image']}
                                value={card.imageURL}
                                render={({ open }) => (
                                    <div>
                                        {card.imageURL ? (
                                            <>
                                                <img src={card.imageURL} alt="" style={{ maxWidth: '100%', marginBottom: '10px' }} />
                                                <Button onClick={open}>Alterar Imagem</Button>
                                            </>
                                        ) : (
                                            <Button onClick={open}>Escolher Imagem</Button>
                                        )}
                                    </div>
                                )}
                            />
                        </MediaUploadCheck>

                        {/* Título */}
                        <RichText
                            tagName="h3"
                            value={card.titulo}
                            onChange={(val) => updateCard(index, 'titulo', val)}
                            placeholder="Título..."
                        />

                        {/* Subtítulo */}
                        <RichText
                            tagName="h4"
                            value={card.subtitulo}
                            onChange={(val) => updateCard(index, 'subtitulo', val)}
                            placeholder="Subtítulo..."
                        />

                        {/* Descrição */}
                        <RichText
                            tagName="p"
                            value={card.descricao}
                            onChange={(val) => updateCard(index, 'descricao', val)}
                            placeholder="Descrição..."
                        />

                        {/* Link */}
                        <URLInput
                            value={card.link}
                            onChange={(val) => updateCard(index, 'link', val)}
                        />
                    </div>
                ))}
            </div>
        );
    },

    save({ attributes }) {
        const { blocoTitulo, cards } = attributes;
        const blockProps = useBlockProps.save();

        return (
            <div {...blockProps} id="equipe" className="dois-cards structure-container">
                {blocoTitulo && <h2 className='base-tag'>{blocoTitulo}</h2>}
                <div className="cards-container">
                    {cards.map((card, index) => (
                        <div key={index} className="card">
                            {card.imageURL && <img src={card.imageURL} alt="" />}
                            <div className="text">
                                <h3 className='titulo-main'>{card.titulo}</h3>
                                <h4 className='base-allcaps'>{card.subtitulo}</h4>
                                <p className='base-main'>{card.descricao}</p>
                                {card.link && <a href={card.link} className="btn-link base-main">CV completo</a>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    },
});
