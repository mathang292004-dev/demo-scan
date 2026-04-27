FROM semgrep/semgrep:latest

WORKDIR /app

COPY . /app

RUN mkdir -p /root/.semgrep

CMD ["semgrep", "scan", "--config", "auto", "--sarif", "--output", "semgrep-report.sarif", "."]
