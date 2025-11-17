import { registerBlockType } from '@wordpress/blocks';
import {
  useBlockProps,
  RichText,
  MediaUpload,
  MediaUploadCheck,
  URLInput,
} from '@wordpress/block-editor';
import { Button, TextareaControl } from '@wordpress/components';
import metadata from './block.json';

registerBlockType(metadata.name, {
  ...metadata,

  edit({ attributes, setAttributes }) {
    const { blocoTitulo, card, htmlContent } = attributes;
    const blockProps = useBlockProps({ className: 'single-card-block' });

    const onSelectImage = (media) => {
      setAttributes({ card: { ...card, imageURL: media?.url || '' } });
    };

    return (
      <div {...blockProps}>
        {/* Título do bloco */}
        <RichText
          tagName="h2"
          placeholder="Título do bloco..."
          value={blocoTitulo}
          onChange={(val) => setAttributes({ blocoTitulo: val })}
        />

        {/* Card */}
        <div className="single-card">
          {/* Imagem */}
          <MediaUploadCheck>
            <MediaUpload
              onSelect={onSelectImage}
              allowedTypes={['image']}
              value={card.imageURL}
              render={({ open }) => (
                <>
                  {card.imageURL ? (
                    <div>
                      <img
                        src={card.imageURL}
                        alt="Imagem do card"
                        style={{ maxWidth: '100%', marginBottom: '8px' }}
                      />
                      <Button isSecondary onClick={open}>
                        Alterar imagem
                      </Button>
                    </div>
                  ) : (
                    <Button isPrimary onClick={open}>Escolher imagem</Button>
                  )}
                </>
              )}
            />
          </MediaUploadCheck>

          {/* Campo para SVG */}
          <TextareaControl
            label="Código SVG"
            help="Cole aqui o SVG inline (ex: <svg>...</svg>)"
            value={card.svg || ''}
            onChange={(val) => setAttributes({ card: { ...card, svg: val } })}
          />

          {/* Título */}
          <RichText
            tagName="h3"
            placeholder="Título do card..."
            value={card.titulo}
            onChange={(val) => setAttributes({ card: { ...card, titulo: val } })}
          />

          {/* Subtítulo */}
          <RichText
            tagName="h4"
            placeholder="Subtítulo do card..."
            value={card.subtitulo}
            onChange={(val) => setAttributes({ card: { ...card, subtitulo: val } })}
          />

          {/* Descrição */}
          <RichText
            tagName="p"
            placeholder="Descrição do card..."
            value={card.descricao}
            onChange={(val) => setAttributes({ card: { ...card, descricao: val } })}
          />

          {/* Link do card */}
          <RichText
            tagName="span"
            placeholder="Texto do link..."
            value={card.link?.text || ''}
            onChange={(text) =>
              setAttributes({ card: { ...card, link: { ...card.link, text } } })
            }
          />
          <URLInput
            value={card.link?.url || ''}
            onChange={(url, post) =>
              setAttributes({
                card: { ...card, link: { ...card.link, url, id: post?.id || 0 } },
              })
            }
            placeholder="Cole a URL aqui..."
          />
        </div>

        {/* Campo para shortcode ou HTML extra */}
        <RichText
          tagName="div"
          placeholder="Cole aqui shortcode ou HTML..."
          value={htmlContent}
          onChange={(val) => setAttributes({ htmlContent: val })}
        />
      </div>
    );
  },

  save({ attributes }) {
    const { blocoTitulo, card, htmlContent } = attributes;
    const blockProps = useBlockProps.save({
      className: 'single-card-block structure-container',
    });

    return (
      <div>
        {/* SVG inline */}
        {card.svg && (
        <div
          className="card-svg"
          dangerouslySetInnerHTML={{ __html: card.svg }}
        />
        )}
              <div id="contato" {...blockProps}>
          <div className="single-card">
            {blocoTitulo && <h2 className="base-allcaps">{blocoTitulo}</h2>}
            <div className="card">
              {/* Imagem */}
              {card.imageURL && <img src={card.imageURL} alt="" />}

              <div className="text">
                {card.titulo && <h3 className="titulo-main">{card.titulo}</h3>}
                {card.subtitulo && <h4 className="base-allcaps">{card.subtitulo}</h4>}
                {card.descricao && <p className="base-main">{card.descricao}</p>}

                {/* Link */}
                {card.link?.url && (
                  <a href={card.link.url} className="btn-link base-main">
                    {card.link.text || 'CV completo'}
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="single-contact">
            {htmlContent && <div dangerouslySetInnerHTML={{ __html: htmlContent }} />}
          </div>
        </div>
      </div>
    );
  },
});
