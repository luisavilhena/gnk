import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, RichText, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import metadata from './block.json';

registerBlockType(metadata.name, {
  ...metadata,

  edit({ attributes, setAttributes }) {
    const { imageURL, title, description } = attributes;
    const blockProps = useBlockProps({ className: 'image-textright' });

    const onSelectImage = (media) => {
      setAttributes({ imageURL: media?.url || '' });
    };

    return (
      <div {...blockProps}>
        {/* Upload da Imagem */}
        <MediaUploadCheck>
          <MediaUpload
            onSelect={onSelectImage}
            allowedTypes={['image']}
            value={imageURL}
            render={({ open }) => (
              <>
                {imageURL ? (
                  <div className="image-text-overlay__preview">
                    <img src={imageURL} alt="Preview" />
                    <Button isSecondary onClick={open} style={{ marginTop: '8px' }}>
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

        {/* Texto sobreposto */}
        <div className="image-text-overlay__content">
          <RichText
            tagName="h2"
            className="image-text-overlay__title"
            placeholder="Digite o título..."
            value={title}
            onChange={(val) => setAttributes({ title: val })}
          />
          <RichText
            tagName="p"
            className="image-text-overlay__description"
            placeholder="Digite a descrição..."
            value={description}
            onChange={(val) => setAttributes({ description: val })}
          />
        </div>
      </div>
    );
  },

  save({ attributes }) {
    const { imageURL, title, description } = attributes;
    const blockProps = useBlockProps.save({ className: 'image-textright' });

    return (
      <div {...blockProps}>
        {imageURL && <img src={imageURL} alt={title || 'Imagem de fundo'} />}
        <div className="image-text-overlay__content structure-container">
          {title && <h2 className="image-text-overlay__title titulo-bio">{title}</h2>}
          {description && <p className="image-text-overlay__description base-main">{description}</p>}
        </div>
      </div>
    );
  },
});
