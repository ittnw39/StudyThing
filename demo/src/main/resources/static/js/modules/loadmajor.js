function loadmajor() {
    // JSON 데이터
    const data = [
        { "value": "자연과학대학", "text": "자연과학대학" },
        { "value": "수학과", "text": "수학과" },
        { "value": "물리학과", "text": "물리학과" },
        { "value": "화학과", "text": "화학과" },
        { "value": "식품영양학과", "text": "식품영양학과" },
        { "value": "생명과학정보학부", "text": "생명과학정보학부" },
        { "value": "생명과학정보학과", "text": "생명과학정보학과" },
        { "value": "공과대학", "text": "공과대학" },
        { "value": "화학공학과", "text": "화학공학과" },
        { "value": "신소재공학과", "text": "신소재공학과" },
        { "value": "환경에너지공학과", "text": "환경에너지공학과" },
        { "value": "토목환경공학과", "text": "토목환경공학과" },
        { "value": "교통공학과", "text": "교통공학과" },
        { "value": "기계공학과", "text": "기계공학과" },
        { "value": "산업경영공학과", "text": "산업경영공학과" },
        { "value": "전기공학과", "text": "전기공학과" },
        { "value": "정보통신공학과", "text": "정보통신공학과" },
        { "value": "전자공학과", "text": "전자공학과" },
        { "value": "컴퓨터공학과", "text": "컴퓨터공학과" },
        { "value": "반도체공학과", "text": "반도체공학과" },
        { "value": "예술체육대학", "text": "예술체육대학" },
        { "value": "체육학부", "text": "체육학부" },
        { "value": "체육학부 경기지도학전공 (야간)", "text": "체육학부 경기지도학전공 (야간)" },
        { "value": "바둑학과", "text": "바둑학과" },
        { "value": "음악학부", "text": "음악학부" },
        { "value": "디자인학부", "text": "디자인학부" },
        { "value": "영화뮤지컬학부 영화전공", "text": "영화뮤지컬학부 영화전공" },
        { "value": "영화뮤지컬학부 뮤지컬공연전공", "text": "영화뮤지컬학부 뮤지컬공연전공" },
        { "value": "스포츠학부", "text": "스포츠학부" },
        { "value": "스포츠학부 스포츠지도학전공 (야간)", "text": "스포츠학부 스포츠지도학전공 (야간)" },
        { "value": "예술학부", "text": "예술학부" },
        { "value": "예술학부 피아노전공", "text": "예술학부 피아노전공" },
        { "value": "예술학부 성악전공", "text": "예술학부 성악전공" },
        { "value": "예술학부 작곡전공", "text": "예술학부 작곡전공" },
        { "value": "예술학부 영화전공", "text": "예술학부 영화전공" },
        { "value": "예술학부 뮤지컬공연전공", "text": "예술학부 뮤지컬공연전공" },
        { "value": "예술학부 아트앤멀티미디어작곡전공", "text": "예술학부 아트앤멀티미디어작곡전공" },
        { "value": "인문대학", "text": "인문대학" },
        { "value": "국어국문학과", "text": "국어국문학과" },
        { "value": "영어영문학과", "text": "영어영문학과" },
        { "value": "중어중문학과", "text": "중어중문학과" },
        { "value": "일어일문학과", "text": "일어일문학과" },
        { "value": "사학과", "text": "사학과" },
        { "value": "문헌정보학과", "text": "문헌정보학과" },
        { "value": "아랍지역학과", "text": "아랍지역학과" },
        { "value": "미술사학과", "text": "미술사학과" },
        { "value": "철학과", "text": "철학과" },
        { "value": "문예창작학과", "text": "문예창작학과" },
        { "value": "사회과학대학", "text": "사회과학대학" },
        { "value": "행정학과", "text": "행정학과" },
        { "value": "경제학과", "text": "경제학과" },
        { "value": "정치외교학과", "text": "정치외교학과" },
        { "value": "디지털미디어학과", "text": "디지털미디어학과" },
        { "value": "아동학과", "text": "아동학과" },
        { "value": "청소년지도학과", "text": "청소년지도학과" },
        { "value": "사회복지학과", "text": "사회복지학과" },
        { "value": "사회복지학과 (야간)", "text": "사회복지학과 (야간)" },
        { "value": "경영대학", "text": "경영대학" },
        { "value": "경영학과", "text": "경영학과" },
        { "value": "경영정보학과", "text": "경영정보학과" },
        { "value": "국제통상학과", "text": "국제통상학과" },
        { "value": "부동산학과", "text": "부동산학과" },
        { "value": "부동산학과 (야간)", "text": "부동산학과 (야간)" },
        { "value": "법과대학", "text": "법과대학" },
        { "value": "법학과", "text": "법학과" },
        { "value": "글로벌법무금융학과", "text": "글로벌법무금융학과" },
        { "value": "법무정책학과", "text": "법무정책학과" },
        { "value": "법무정책학과 (야간)", "text": "법무정책학과 (야간)" },
        { "value": "미래융합대학", "text": "미래융합대학" },
        { "value": "뮤직콘텐츠학과", "text": "뮤직콘텐츠학과" },
        { "value": "뷰티경영학과", "text": "뷰티경영학과" },
        { "value": "사회복지학과", "text": "사회복지학과" },
        { "value": "아동보육상담학과", "text": "아동보육상담학과" },
        { "value": "부동산학과", "text": "부동산학과" },
        { "value": "아동심리상담학과", "text": "아동심리상담학과" },
        { "value": "법무정책학과", "text": "법무정책학과" },
        { "value": "유아보육학과", "text": "유아보육학과" },
        { "value": "물류유통경영학과", "text": "물류유통경영학과" },
        { "value": "융합예술실용음악학과", "text": "융합예술실용음악학과" },
        { "value": "법무행정학과", "text": "법무행정학과" },
        { "value": "복지경영학과", "text": "복지경영학과" },
        { "value": "심리치료학과", "text": "심리치료학과" },
        { "value": "복지상담학과", "text": "복지상담학과" },
        { "value": "미래융합경영학과", "text": "미래융합경영학과" },
        { "value": "아동복지상담학과", "text": "아동복지상담학과" },
        { "value": "유통산업경영학과", "text": "유통산업경영학과" },
        { "value": "만화애니콘텐츠학과", "text": "만화애니콘텐츠학과" },
        { "value": "멀티디자인학과", "text": "멀티디자인학과" },
        { "value": "스포츠산업경영학과", "text": "스포츠산업경영학과" },
        { "value": "융합디자인학과", "text": "융합디자인학과" },
        { "value": "아동복지경영학과", "text": "아동복지경영학과" },
        { "value": "복지상담경영학과", "text": "복지상담경영학과" },
        { "value": "미용예술학과", "text": "미용예술학과" },
        { "value": "웹툰콘텐츠학과", "text": "웹툰콘텐츠학과" },
        { "value": "회계세무학과", "text": "회계세무학과" },
        { "value": "건축대학", "text": "건축대학" },
        { "value": "건축학부(건축학전공/전통건축전공)", "text": "건축학부(건축학전공/전통건축전공)" },
        { "value": "건축학부 건축학전공", "text": "건축학부 건축학전공" },
        { "value": "건축학부 전통건축전공", "text": "건축학부 전통건축전공" },
        { "value": "공간디자인학과", "text": "공간디자인학과" },
        { "value": "건축학부 공간디자인전공", "text": "건축학부 공간디자인전공" },
        { "value": "ICT융합대학", "text": "ICT융합대학" },
        { "value": "디지털콘텐츠디자인학과", "text": "디지털콘텐츠디자인학과" },
        { "value": "융합소프트웨어학부", "text": "융합소프트웨어학부" },
        { "value": "정보통신공학과", "text": "정보통신공학과" },
        { "value": "융합전공", "text": "융합전공" },
        { "value": "융합예술학융합전공", "text": "융합예술학융합전공" },
        { "value": "국제학부", "text": "국제학부" }
    ];

    const selectElement = document.getElementById('major-combobox');

    if (!selectElement) {
            return Promise.reject(new Error('major-combobox 요소를 찾을 수 없습니다.'));
        }

    return new Promise((resolve, reject) => {
        try {
            data.forEach(item => {
                const option = document.createElement('option');
                option.value = item.value;
                option.textContent = item.text;
                selectElement.appendChild(option);
            });

            const expectedOptionsCount = data.length + 1;
            if (selectElement.options.length === expectedOptionsCount) {
                resolve('성공적으로 로드되었습니다. \n 로드된 학과 수 :' + data.length);
            } else {
                reject(new Error('알 수 없는 이유로 로드에 실패하였습니다.'));
            }
        } catch (error) {
            reject(new Error(error.message));
        }
    });
}

export {loadmajor}; //function loadmajor export