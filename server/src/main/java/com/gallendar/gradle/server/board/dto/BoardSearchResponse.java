package com.gallendar.gradle.server.board.dto;

import com.gallendar.gradle.server.board.entity.Board;
import com.gallendar.gradle.server.tags.domain.BoardTags;
import com.gallendar.gradle.server.tags.domain.Tags;
import com.gallendar.gradle.server.tags.type.TagStatus;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Getter
@Builder
public class BoardSearchResponse {
    private Long boardId;
    private String title;
    private LocalDate createdPost;
    private String category;
    private Map<String, TagStatus> tagsMember;

    public static BoardSearchResponse from(Board board, Map<String, TagStatus> tagsMember) {
        Long boardId = board.getBoardId();
        String title = board.getTitle();
        LocalDate createdPost = board.getCreated();
        String category = board.getCategory().getCategoryTitle();
        Map<String, TagStatus> tagMember = tagsMember;

        return BoardSearchResponse.builder()
                .boardId(boardId)
                .title(title)
                .createdPost(createdPost)
                .tagsMember(tagMember)
                .category(category)
                .build();
    }
}
