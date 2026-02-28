// src/components/browse/SchemaScript.tsx

interface Props {
	schema: Record<string, unknown>;
}

export function SchemaScript({ schema }: Props) {
	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
		/>
	);
}