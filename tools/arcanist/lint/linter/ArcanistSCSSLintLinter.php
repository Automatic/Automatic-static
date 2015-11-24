<?php

// taken from https://secure.phabricator.com/D10741

final class ArcanistSCSSLintLinter extends ArcanistExternalLinter {

  private $config;

  public function getInfoName() {
    return 'SCSS-Lint';
  }

  public function getInfoURI() {
    return 'https://github.com/brigade/scss-lint';
  }

  public function getInfoDescription() {
    return pht(
      '%s is a tool to help keep your SCSS files clean and readable.',
      'SCSS-Lint');
  }

  public function getLinterName() {
    return 'SCSS';
  }

  public function getLinterConfigurationName() {
    return 'scss-lint';
  }

  public function getDefaultBinary() {
    return 'scss-lint';
  }

  public function getVersion() {
    list($stdout) = execx('%C --version', $this->getExecutableCommand());

    $matches = array();
    if (preg_match('/^scss-lint\s(?P<version>\d+\.\d+\.\d+)$/', $stdout,
      $matches)) {
      return $matches['version'];
    } else {
      return false;
    }
  }

  public function getInstallInstructions() {
    return pht(
      'Install %s using `%s`.',
      'SCSS-Lint',
      'gem install scss_lint');
  }

  protected function getMandatoryFlags() {
    $options = array(
      '--format=JSON',
    );

    if ($this->config) {
      $options[] = '--config='.$this->config;
    }

    return $options;
  }

  public function getLinterConfigurationOptions() {
    $options = array(
      'scss-lint.config' => array(
        'type' => 'optional string',
        'help' => pht('A custom configuration file.'),
      ),
    );

    return $options + parent::getLinterConfigurationOptions();
  }

  public function setLinterConfigurationValue($key, $value) {
    switch ($key) {
      case 'scss-lint.config':
        $this->config = $value;
        return;
    }

    return parent::setLinterConfigurationValue($key, $value);
  }

  protected function parseLinterOutput($path, $err, $stdout, $stderr) {
    $results = phutil_json_decode($stdout);
    $messages = array();

    foreach ($results as $path => $offenses) {
      foreach ($offenses as $offense) {
        $message = id(new ArcanistLintMessage())
          ->setPath($path)
          ->setLine($offense['line'])
          ->setChar($offense['column'])
          ->setCode($offense['linter'])
          ->setSeverity($this->getArcSeverity($offense['severity']))
          ->setName($this->getLinterName())
          ->setDescription($offense['reason']);

        $messages[] = $message;
      }
    }

    return $messages;
  }

  private function getArcSeverity($severity) {
    switch ($severity) {
      case 'warning':
        return ArcanistLintSeverity::SEVERITY_WARNING;

      case 'error':
        return ArcanistLintSeverity::SEVERITY_ERROR;

      default:
        return ArcanistLintSeverity::SEVERITY_ADVICE;
    }
  }

}
