package com.sport_store.reposiotry;

import com.sport_store.entity.product.Size;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ISizeRepository extends JpaRepository<Size, Long> {

}
