/**
 * Liferay Commerce Constants and Constraints
 */

const SKU_COMMERCE_CONSTRAINTS = Object.freeze({
  // Field types allowed for options that contribute to SKUs (variants)
  SKU_CONTRIBUTOR_FIELD_TYPES: [
    'checkbox',
    'checkbox_multiple',
    'radio',
    'select',
    'select_date',
  ],

  // Field types that support multiple values
  MULTIPLE_VALUES_FIELD_TYPES: [
    'checkbox',
    'checkbox_multiple',
    'radio',
    'select',
    'select_date',
  ],

  // Field types that require/support predefined OptionValues
  FIELD_TYPES_WITH_VALUES: [
    'checkbox',
    'checkbox_multiple',
    'radio',
    'select',
    'select_date',
  ],

  // All valid field types for commerce options as per OpenAPI spec
  VALID_FIELD_TYPES: [
    'checkbox',
    'checkbox_multiple',
    'date',
    'numeric',
    'radio',
    'select',
    'select_date',
    'text',
  ],
});

/**
 * Named field lists a caller can pass as `fields` to the attachment reads, to
 * get a deliberately narrow shape back instead of the whole record (#187).
 *
 * `MEDIA` is the set the media promotion path needs: enough to locate the
 * binary (`src`, with `externalReferenceCode` as the fallback locator) and to
 * reattach it elsewhere unchanged (`title`, `priority`, `contentType`). `id` is
 * there for logging and for the delete endpoint, which is keyed by numeric id.
 *
 * Everything else Liferay's Attachment declares - `galleryEnabled`, `type`,
 * `neverExpire`, `displayDate`, `expirationDate`, `tags`, `options`,
 * `customFields`, `cdnEnabled`, `cdnURL` and the three fileEntry linkage fields
 * - is dropped by this projection. That is fine for promotion, which recreates
 * the attachment rather than reproducing it, and wrong for anything that has to
 * survive an extract -> import -> extract round trip. Such a caller should omit
 * `fields` and take the whole record.
 */
const ATTACHMENT_PROJECTION = Object.freeze({
  MEDIA: Object.freeze([
    'id',
    'externalReferenceCode',
    'title',
    'priority',
    'contentType',
    'src',
  ]),
});

module.exports = {
  ATTACHMENT_PROJECTION,
  SKU_COMMERCE_CONSTRAINTS,
};
