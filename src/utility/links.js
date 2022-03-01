import HomeLinks from '../utility/home-links';
import ActionLinks from '../utility/action-links';

export default function CommonLinks() {
    return (
        <div>
            <HomeLinks />
            <div style={{ textAlign: 'right' }}>                
                <ActionLinks />
            </div>
        </div>
    )
}