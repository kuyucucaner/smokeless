import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkAchievements , getMotivationMessage , getSuggestion } from '../redux/slices/success-slice';

const Achievement = () => {
    const dispatch = useDispatch();
    const { achievements,motivationMessage , suggestion , loading, error } = useSelector((state) => state.success);

    useEffect(() => {
        dispatch(checkAchievements());
        dispatch(getMotivationMessage());
        dispatch(getSuggestion());
    }, [dispatch]);


    return (
        <div>
            <h2>Başarımlar</h2>
            
            {loading && <p>Yükleniyor...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {achievements && achievements.length > 0 ? (
                <ul>
                    {achievements.map((ach) => (
                        <li key={ach.achievement_id}>
                            <strong>{ach.name}</strong> - {ach.description}
                        </li>
                    ))}
                </ul>
            ) : (
                !loading && <p>Henüz bir başarım kazanmadınız.</p>
            )}

            <h2>Günün Motivasyon Mesajı</h2>
            {motivationMessage ? <p>{motivationMessage}</p> : <p>Mesaj yükleniyor...</p>}
            <h2>Öneriler</h2>
            {suggestion ?  <p>{suggestion.suggestion}</p> : <p>Öneri Yükleniyors</p>}
            </div>
    );
};

export default Achievement;
