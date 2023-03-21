package com.sport_store.dto.product;

public interface IProductDto {
     Long getProductId();
     String getProductName();
     String getDescription();
     Double getPrice();
     String getAvatar();
     Long getCategoryId();
}
