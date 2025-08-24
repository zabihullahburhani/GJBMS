from pydantic_settings import BaseSettings
class Settings(BaseSettings):
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "Gold & Jewelry BMS"
    SQLALCHEMY_DATABASE_URI: str = "sqlite:///./goldshop.db"
    JWT_SECRET: str = "CHANGE_ME"
    JWT_ALG: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60*8
    ALLOW_OPEN_REGISTRATION: bool = True
    class Config: env_file = ".env"
settings = Settings()
