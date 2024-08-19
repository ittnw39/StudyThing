package Study_Match.memo.service;

import Study_Match.memo.dto.MemoDTO;
import Study_Match.memo.entity.Memo;
import Study_Match.memo.repository.MemoRepository;
import Study_Match.studyGroup.Entity.StudyGroup;
import Study_Match.studyGroup.Repository.StudyGroupRepository;
import Study_Match.user.Entity.User;
import Study_Match.user.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MemoService {

    private final MemoRepository memoRepository;
    private final StudyGroupRepository studyGroupRepository;
    private final UserRepository userRepository;

    @Transactional
    public Memo saveMemo(Long userId, Long studyGroupId, String content) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        StudyGroup studyGroup = studyGroupRepository.findById(studyGroupId).orElseThrow(() -> new RuntimeException("Study Group not found"));
        Memo memo = new Memo();
        memo.setUser(user);
        memo.setStudyGroup(studyGroup);
        memo.setContent(content);
        return memoRepository.save(memo);
    }

    public List<MemoDTO> getMemosByStudyGroup(Long studyGroupId) {
        List<Memo> memos = memoRepository.findByStudyGroupId(studyGroupId);
        return memos.stream()
                .map(memo -> new MemoDTO(
                        memo.getId(),
                        memo.getUser().getId(),
                        memo.getUser().getName(),
                        memo.getStudyGroup().getId(),
                        memo.getContent(),
                        memo.getCreatedAt()))
                .collect(Collectors.toList());
    }

    @Transactional
    public Memo updateMemo(Long memoId, Long userId, String content) {
        Memo memo = memoRepository.findById(memoId).orElseThrow(() -> new RuntimeException("Memo not found"));
        if (!memo.getUser().getId().equals(userId)) {
            throw new RuntimeException("You are not authorized to update this memo");
        }
        memo.setContent(content);
        return memoRepository.save(memo);
    }


    @Transactional
    public void deleteMemo(Long memoId, Long userId) {
        Memo memo = memoRepository.findById(memoId).orElseThrow(() -> new RuntimeException("Memo not found"));
        if (!memo.getUser().getId().equals(userId)) {
            throw new RuntimeException("You are not authorized to delete this memo");
        }
        memoRepository.delete(memo);
    }
}
