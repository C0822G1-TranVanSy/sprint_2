package com.sport_store.dto.orders;

public interface ICartListDto {
    Long getProductId();
    String getProductName();
    Double getPrice();
    String getAvatar();
    Integer getQuantity();
}
