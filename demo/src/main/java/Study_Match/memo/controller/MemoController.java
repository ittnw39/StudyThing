package Study_Match.memo.controller;

import Study_Match.memo.dto.MemoDTO;
import Study_Match.memo.entity.Memo;
import Study_Match.memo.service.MemoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/memos")
@RequiredArgsConstructor
public class MemoController {

    private final MemoService memoService;

    @PostMapping("/create")
    public ResponseEntity<Memo> createMemo(@RequestParam Long userId, @RequestParam Long studyGroupId, @RequestParam String content) {
        Memo memo = memoService.saveMemo(userId, studyGroupId, content);
        return ResponseEntity.ok(memo);
    }

    @GetMapping("/group/{groupId}")
    public ResponseEntity<List<MemoDTO>> getMemosByGroupId(@PathVariable Long groupId) {
        List<MemoDTO> memos = memoService.getMemosByStudyGroup(groupId);
        return ResponseEntity.ok(memos);
    }

    @PutMapping("/update/{memoId}")
    public ResponseEntity<Memo> updateMemo(
            @PathVariable Long memoId,
            @RequestParam Long userId,
            @RequestParam String content) {
        Memo updatedMemo = memoService.updateMemo(memoId, userId, content);
        return ResponseEntity.ok(updatedMemo);
    }

    @DeleteMapping("/delete/{memoId}")
    public ResponseEntity<Void> deleteMemo(
            @PathVariable Long memoId,
            @RequestParam Long userId) {
        memoService.deleteMemo(memoId, userId);
        return ResponseEntity.noContent().build();
    }
}
