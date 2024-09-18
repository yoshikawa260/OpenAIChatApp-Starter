# ビルドステージ
FROM maven:3.8.5-openjdk-17 AS build

# 作業ディレクトリを指定
WORKDIR /app

# プロジェクトのソースコードをコンテナにコピー
COPY . /app

# Mavenビルドを実行してJARファイルを生成
RUN mvn clean package -DskipTests

# ランタイムステージ
FROM openjdk:17-jdk-slim

# 作業ディレクトリを指定
WORKDIR /app

# ビルドステージからJARファイルをコピー
COPY --from=build /app/target/demo-0.0.1-SNAPSHOT.jar /app/demo.jar

# コンテナがリスンするポートを指定
EXPOSE 8080

# アプリケーションを実行
ENTRYPOINT ["java", "-jar", "/app/demo.jar"]
