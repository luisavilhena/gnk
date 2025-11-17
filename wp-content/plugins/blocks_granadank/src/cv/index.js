import { registerBlockType } from '@wordpress/blocks';
import {
  useBlockProps,
  RichText,
  MediaUpload,
  MediaUploadCheck,
} from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import metadata from './block.json';

registerBlockType(metadata.name, {
  ...metadata,

  edit({ attributes, setAttributes }) {
    const { imageURL, title, subtitle, description, longText } = attributes;
    const blockProps = useBlockProps({ className: 'complex-card' });

    const onSelectImage = (media) => {
      if (!media || !media.url) {
        setAttributes({ imageURL: '' });
        return;
      }
      setAttributes({ imageURL: media.url });
    };

    return (
      <div {...blockProps}>
        {/* Imagem */}
        <div className="complex-card__visual">
          <MediaUploadCheck>
            <MediaUpload
              onSelect={onSelectImage}
              allowedTypes={['image']}
              value={imageURL}
              render={({ open }) => (
                <>
                  {imageURL ? (
                    <div className="complex-card__img-preview">
                      <img src={imageURL} alt="Preview" />
                      <Button isSecondary onClick={open} style={{ marginTop: 8 }}>
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
        </div>

        {/* Conteúdo textual */}
        <div className="complex-card__content">
          <RichText
            tagName="h2"
            className="complex-card__title"
            placeholder="Título..."
            value={title}
            onChange={(val) => setAttributes({ title: val })}
            allowedFormats={['core/bold', 'core/italic']}
          />

          <RichText
            tagName="h3"
            className="complex-card__subtitle"
            placeholder="Subtítulo..."
            value={subtitle}
            onChange={(val) => setAttributes({ subtitle: val })}
            allowedFormats={['core/bold', 'core/italic']}
          />

          <RichText
            tagName="p"
            className="descricao"
            placeholder="Descrição curta..."
            value={description}
            onChange={(val) => setAttributes({ description: val })}
            allowedFormats={['core/bold', 'core/italic']}
          />

          {/* Texto longo com múltiplos parágrafos */}
          <RichText
            tagName="div"
            className="long-text"
            placeholder="Texto longo — use Enter para criar novos parágrafos..."
            value={longText}
            onChange={(val) => setAttributes({ longText: val })}
            allowedFormats={['core/bold', 'core/italic', 'core/link']}
            multiline="p"
          />
        </div>
      </div>
    );
  },

  save({ attributes }) {
    const { imageURL, title, subtitle, description, longText } = attributes;
    const blockProps = useBlockProps.save({ className: 'complex-card' });

    return (
      <div {...blockProps}>
        {imageURL && (
          <div className="complex-card__visual">
            <img src={imageURL} alt={title || 'Imagem do card'} />
          </div>
        )}

        <div className="complex-card__content structure-container--right">
            <div className='header-row'>
                {title && <h2 className="complex-card__title titulo-bio">{title}</h2>}
            </div>
          {subtitle && <h3 className="complex-card__subtitle base-allcaps">{subtitle}</h3>}
          {description && <p className="descricao base-main">{description}</p>}
          {longText && (
            <RichText.Content
              tagName="div"
              className="long-text base-main"
              value={longText}
              multiline="p"
            />
          )}
        </div>
      </div>
    );
  },
});
