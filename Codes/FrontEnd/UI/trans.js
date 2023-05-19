import React, { useState, useEffect } from "react";

const TranslationInterface = () => {
    const [sourceText, setSourceText] = useState("");
    const [translatedText, setTranslatedText] = useState("");
    const [translationMemory, setTranslationMemory] = useState({});

    const handleTranslate = () => {
        // 模拟翻译过程，实际情况中应当调用翻译API或者后端服务
        const translation = sourceText.split('').reverse().join('');
        setTranslatedText(translation);

        // 保存到翻译记忆库
        setTranslationMemory(prevMemory => ({
            ...prevMemory,
            [sourceText]: translation,
        }));
    };

    useEffect(() => {
        // 浏览翻译记忆库
        console.log(translationMemory);
    }, [translationMemory]);

    return (
        <div>
            <h1>Translation System</h1>
            <div id="translation-input">
                <textarea
                    id="source-text"
                    placeholder="Enter text to translate..."
                    value={sourceText}
                    onChange={(e) => setSourceText(e.target.value)}
                ></textarea>
                <button id="translate-button" onClick={handleTranslate}>
                    Translate
                </button>
            </div>
            <div id="translation-output">
                <h2>Translation:</h2>
                <p id="translated-text">{translatedText}</p>
            </div>
        </div>
    );
};

export default TranslationInterface;
