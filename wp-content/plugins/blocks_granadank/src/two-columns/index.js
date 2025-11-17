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
    const { columns = [] } = attributes;
    const blockProps = useBlockProps({ className: 'two-columns-block' });

    // Atualiza qualquer campo (imagem, descrição, etc.)
    const onChangeField = (index, field, value) => {
      const newColumns = [...columns];
      newColumns[index] = {
        ...newColumns[index],
        [field]: value,
      };
      setAttributes({ columns: newColumns });
    };

    // Atualiza imagem
    const onSelectImage = (index, media) => {
      const newColumns = [...columns];
      newColumns[index] = {
        ...newColumns[index],
        imageURL: media?.url || '',
      };
      setAttributes({ columns: newColumns });
    };

    return (
      <div {...blockProps}>
        <div className="two-columns">
          {columns.map((col, index) => (
            <div key={index} className="column">
              {/* Imagem */}
              <MediaUploadCheck>
                <MediaUpload
                  onSelect={(media) => onSelectImage(index, media)}
                  allowedTypes={['image']}
                  value={col.imageURL}
                  render={({ open }) => (
                    <>
                      {col.imageURL ? (
                        <div className="image-preview">
                          <img src={col.imageURL} alt={`Coluna ${index + 1}`} />
                          <Button
                            isSecondary
                            onClick={open}
                            style={{ marginTop: 8 }}
                          >
                            Alterar imagem
                          </Button>
                        </div>
                      ) : (
                        <Button isPrimary onClick={open}>
                          Escolher imagem
                        </Button>
                      )}
                    </>
                  )}
                />
              </MediaUploadCheck>

              {/* Texto */}
              <RichText
                tagName="p"
                className="column-description"
                placeholder="Descrição..."
                value={col.description}
                onChange={(val) => onChangeField(index, 'description', val)}
                allowedFormats={['core/bold', 'core/italic', 'core/link']}
              />
            </div>
          ))}
        </div>
      </div>
    );
  },

  save({ attributes }) {
    const { columns = [] } = attributes;
    const blockProps = useBlockProps.save({ className: 'two-columns-block' });

    return (
      <div {...blockProps}>
        <div className="two-columns">
          {columns.map((col, index) => (
            <div key={index} className="column">
              {col.imageURL && (
                <img src={col.imageURL} alt={`Coluna ${index + 1}`} />
              )}
              {col.description && (
                <RichText.Content
                  tagName="p"
                  className="column-description base-main structure-container"
                  value={col.description}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  },
});
