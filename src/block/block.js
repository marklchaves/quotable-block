/**
 * BLOCK: quotable-block
 *
 * Register the Quotable Block Gutenberg block.
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

const { InspectorControls } = wp.blockEditor;
const { PanelBody, PanelRow } = wp.components;
const { Fragment } = wp.element;

import { TextControl } from '@wordpress/components';
import { TextareaControl } from '@wordpress/components';
import { ColorPicker } from '@wordpress/components';

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'cgb/block-quotable-block', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Quotable Block' ), // Block title.
	icon: 'shield', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'quotable-block' ),
		__( 'quotable' ),
		__( 'quote' ),
		__( 'quotes' )
	],
	attributes: {
		quotationText: {
			type: "string",
			default: "It's a long way to the top if you wanna rock 'n' roll.",
		},
		attributionText: {
			type: "string",
			default: "AC/DC",
		},
		descriptionColour: {
			type: "string",
			default: "#111",
		},
		attributionColour: {
			type: "string",
			default: "#111",
		},
	},

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Component.
	 */
	edit: ( props ) => {

		const {
			attributes: {
				quotationText,
				attributionText,
				quotationColour,
				attributionColour,
			},
			setAttributes,
		} = props;			

		function sanitize(dirty) {
			return DOMPurify.sanitize(dirty);
		}

		function setQuotationText( quotation ) {
			const value = sanitize(quotation);
			setAttributes( { quotationText: value } );
		}
		
		function setAttributionText( attribution ) {
			const value = sanitize(attribution);
			setAttributes( { attributionText: value } );
		}

		function setQuotationColour( colour ) {
			setAttributes( { quotationColour: colour.hex } );
		}

		function setAttributionColour( colour ) {
			setAttributes( { attributionColour: colour.hex } );
		}

		// Creates a <p class='wp-block-cgb-block-quotable-block'></p>.
		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __('Quotable Block Settings') }>
						<PanelRow className="quotable-label-row">
							<label>Quotation Font Colour</label>
							<ColorPicker
            					color={ quotationColour }
            					onChangeComplete={ setQuotationColour }
            					disableAlpha
        					/>
						</PanelRow>
						<PanelRow className="quotable-label-row">
							<label>Attribution Font Colour</label>
							<ColorPicker
            					color={ attributionColour }
            					onChangeComplete={ setAttributionColour }
            					disableAlpha
        					/>
						</PanelRow>
					</PanelBody>
				</InspectorControls>
				<section id="quotable-edit-area">
					<div>
						<TextareaControl
							label="Quotation (h3)"
							id="quotation-text"
							value={ quotationText }
							placeholder="It's a long way to the top if you wanna rock 'n' roll."
							onChange={ setQuotationText }
						/>
					</div>
					<div>
						<TextControl
							label="Attribution (p)"
							id="attribution-text"
							value={ attributionText }
							placeholder="AC/DC"
        					onChange={ setAttributionText }
    					/>						
					</div>
				</section>
			</Fragment>
		);
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Frontend HTML.
	 */
	save: ( props ) => {
		const {
			attributes: {
				quotationText,
				attributionText,
				quotationColour,
				attributionColour,
			},
		} = props;

		const quotationStyles = {
			color: quotationColour
		};

		const attributionStyles = {
			color: attributionColour
		};

		return (
			<article>
				<blockquote className="quotable qtooltip">
					<h3 style={quotationStyles}>{ quotationText }</h3>
					<p style={attributionStyles}>{ attributionText }</p>
					<span class="qtooltiptext">Click to copy</span>
				</blockquote>
			</article>
		);
	},
} );
