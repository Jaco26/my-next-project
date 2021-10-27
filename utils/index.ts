export const blockMod = (blockName: string, modifiers: (string|boolean)[]) => modifiers
    .filter(modifier => 
        typeof modifier === 'string' ? !!modifier.length : false
    )
    .map(modifier => 
        `${blockName}--${(modifier as string).trim()}`
    )
    .join(' ')

    