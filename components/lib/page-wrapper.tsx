
type Props = {
    children: React.ReactNode
}

export const PageWrapper = ({ children }: Props) => (
    <div id="page-wrapper" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
        {children}
    </div>
)