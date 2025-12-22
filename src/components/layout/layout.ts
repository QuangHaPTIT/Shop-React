export const layoutConfig = {
    sidebar: {
        width: 260,
        collapsedWidth: 80,
        defaultCollapsed: false,
    },
    header: {
        height: 64,
        fixed: true,
    },
    footer: {
        height: 64,
        fixed: true,
    },
    content: {
        padding: 24,
        paddingTopWithHeader: 24, // pading top when have header
    },
    transition: {
        duration: 300, // ms
        easing: 'ease',
    },
} as const;