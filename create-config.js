const { createConfig, img } = require('./config')

createConfig({
    name: 'Jacob',
    sideNav: {
        auto: true,
    },
    panels: [
        {
            height: '50%',
            sections: [
                {
                    title: 'Subject 1',
                    id: 'subject-1',
                    content: [
                        
                    ]
                }
            ]
        },
        {
            height: '50%',
            sections: [
                {
                    title: 'Subject 2',
                    id: 'subject-2',
                    content: [
                        
                    ]
                }
            ]
        }
    ]
})
