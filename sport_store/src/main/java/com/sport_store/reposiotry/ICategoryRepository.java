package com.sport_store.reposiotry;

import com.sport_store.entity.product.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ICategoryRepository extends JpaRepository<Category, Long> {
    @Query(value = "select * from category", nativeQuery = true)
    List<Category> findAllCategory();

    @Query(value = "select category_name from category where category_id=:categoryId", nativeQuery = true)
    String getCategoryName(@Param("categoryId") Long categoryId);
}
