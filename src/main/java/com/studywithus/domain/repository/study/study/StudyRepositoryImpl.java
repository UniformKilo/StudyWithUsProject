package com.studywithus.domain.repository.study.study;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Expression;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.studywithus.domain.entity.study.Study;
import com.studywithus.domain.repository.study.study.dto.QStudyDto;
import com.studywithus.domain.repository.study.study.dto.StudyDto;
import com.studywithus.domain.repository.study.study.dto.StudyPageSearchCondition;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.data.web.PageableDefault;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.Optional;

import static com.studywithus.domain.entity.study.QStudy.study;

public class StudyRepositoryImpl implements StudyRepositoryCustom {
//extends QuerydslRepositorySupport
//    public StudyRepositoryImpl() {
//        super(Study.class);
//    }

    private final JPAQueryFactory queryFactory;

    public StudyRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }


    private OrderSpecifier<?> studySort(Pageable pageable) {
        if (!pageable.getSort().isEmpty()) {
            for (Sort.Order order : pageable.getSort()) {
                Order direction = order.getDirection().isAscending() ? Order.ASC : Order.DESC;
                switch (order.getProperty()){
                    case "regDate":
                        return new OrderSpecifier(direction, study.regDate);
                    case "studyMemberCount":
                        return new OrderSpecifier(direction, study.studyMemberCount);
                    default:
                        return new OrderSpecifier(direction, study.regDate);
                }
            }
        }
        return null;
    }


    public Page<StudyDto> searchStudyPage(Pageable pageable) {

        List<StudyDto> content = queryFactory
                .select(new QStudyDto(study.id, study.regDate, study.studyName, study.studyExplanation, study.member.nickname, study.studyMemberCount))
                .from(study)
                .orderBy(studySort(pageable))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();
        JPAQuery<Study> countQuery = queryFactory
                .select(study)
                .from(study);
        return PageableExecutionUtils.getPage(content, pageable, () -> countQuery.fetch().size());
    }

    public Optional<Long> searchStudyByMember(Long memberId){
        return Optional.ofNullable(queryFactory
                .select(study.member.id)
                .from(study)
                .where(study.member.id.eq(memberId))
                .fetchOne());
    }
}
