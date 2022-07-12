import { DocumentIcon } from '@sanity/icons'
import blockContent from './blockContent'

export const schemaTypes = [
    {
        title: "Post",
        name: "post",
        icon: DocumentIcon,
        type: "document",
        fields: [
            {
                name: "title",
                title: "Title",
                type: "string"
            },
            {
                name: "slug", 
                title: "Slug",
                type: "slug",
                options: {
                    source: "title",
                    maxLength: 96,
                },
            },
            {
                name: "publishedAt",
                title: "Published at",
                type: "datetime",
            },
            {
                name: "body",
                title: "Body",
                type: "blockContent",
            },
        ],
        preview: {
            select: {
                title: "title",
            },
        },
    },
    blockContent,
]
